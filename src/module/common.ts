interface StateType {
  appName: string;
}

const defaultState: StateType = {
  appName: '8ちゃんねる'
};

export default (state: StateType = defaultState, action: any) => {
  return state;
};
