import {
  IGetSharesData,
  IGetSharesVariables,
  GET_SHARES,
  shareKeys
} from "./../queries/shares-query";
import { IShareData } from "./../types";
import { MutationUpdaterFn } from "apollo-client";
import { useCallback } from "react";
import { IShare } from "../types";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

export interface ICreateShareVariables {
  name: string;
}

export interface ICreateShareData {
  createShare: IShare;
}

export const CREATE_SHARE = gql`
	mutation CreateShare($name: String!){
		createShare(name: $name){
			${shareKeys}
		}
	}
`;

export const useCreateShare = ({ name }: any) => {
  const updateShareCache = useCallback<MutationUpdaterFn<ICreateShareData>>(
    (cache, { data }) => {
      const currentShares = cache.readQuery<
        IGetSharesData,
        IGetSharesVariables
      >({
        query: GET_SHARES
      })!.user.shares;

      cache.writeQuery<IGetSharesData, IGetSharesVariables>({
        query: GET_SHARES,
        data: { user: { shares: currentShares.concat([data!.createShare]) } }
      });
    },
    [name]
  );

  const hook = useMutation(CREATE_SHARE, {
    variables: { name },
    update: updateShareCache
  });

  return hook;
};
