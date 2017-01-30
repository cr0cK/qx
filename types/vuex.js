// @flow

export type VueXAction = ({
  dispatch: Function,
  commit: Function,
}, payload: any) => Promise<any> | void;

export type VueXMutation = (state: Object, payload: any) => void;

export type VueXActions = {
  [string]: VueXAction,
};

export type VueXMutations = {
  [string]: VueXMutation,
};
