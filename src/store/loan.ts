import {
  ThunkAction,
  configureStore,
  createSlice,
  Action,
  PayloadAction,
} from '@reduxjs/toolkit';
import { qualificationRequest, QualificationData } from '../api';

export enum Content {
  LandingPage = 'LANDING_PAGE',
  DisqualifiedPage = 'DISQUALIFIED_PAGE',
  CreateAccountPage = 'CREATE_ACCOUNT_PAGE',
  LoadingPage = 'LOADING_PAGE',
}

export enum LoanStatus {
  NotAsked = 'NOT_ASKED',
  Loading = 'LOADING',
  Disqualified = 'DISQUALIFIED',
  Qualified = 'QUALIFIED',
  Error = 'Error',
}

const initialState = {
  loanStatus: LoanStatus.NotAsked,
  page: Content.LandingPage,
  message: '',
};

export const requestQualify = (data: QualificationData): AppThunk => async (
  dispatch
) => {
  const { Loading, Qualified, Disqualified, Error: RequestError } = LoanStatus;
  dispatch(setLoanStatus(Loading));

  try {
    const response = await qualificationRequest(data);
    const qualified = response.qualified ? Qualified : Disqualified;
    dispatch(setLoanStatus(qualified));
  } catch (error) {
    dispatch(setMessage(error.message));
    dispatch(setLoanStatus(RequestError));
  }
};

const toPageFromLoanStatus = (loanStatus: LoanStatus): Content => {
  const { NotAsked, Loading, Qualified, Disqualified } = LoanStatus;
  const {
    CreateAccountPage,
    DisqualifiedPage,
    LandingPage,
    LoadingPage,
  } = Content;

  switch (loanStatus) {
    case Loading:
      return LoadingPage;
    case Qualified:
      return CreateAccountPage;
    case Disqualified:
      return DisqualifiedPage;
    case NotAsked:
    default:
      return LandingPage;
  }
};

export const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setLoanStatus: (state, action: PayloadAction<LoanStatus>) => {
      const page = toPageFromLoanStatus(action.payload);
      state.loanStatus = action.payload;
      state.page = page;
    },
    setMessage: (state, actions: PayloadAction<string>) => {
      state.message = actions.payload;
    },
  },
});

export const { setLoanStatus, setMessage } = loanSlice.actions;

const store = configureStore({ reducer: { loan: loanSlice.reducer } });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
