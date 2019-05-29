import { shareKeys } from "./../queries/shares-query";
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

export const useCreateShare = ({ name }: ICreateShareVariables) => {
	return useMutation(CREATE_SHARE, {
		variables: { name }
	});
};
