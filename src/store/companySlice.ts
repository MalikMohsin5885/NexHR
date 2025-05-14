import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CompanyInfo {
  name: string;
  industry: string;
  location: string;
  email: string;
  phone: string;
}

interface CompanyState {
  companyInfo: CompanyInfo | null;
  needsCompanyInfo: boolean;
}

const initialState: CompanyState = {
  companyInfo: null,
  needsCompanyInfo: true // Adjusted to true
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyInfo(state, action: PayloadAction<CompanyInfo>) {
      state.companyInfo = action.payload;
      state.needsCompanyInfo = false;
    },
    setNeedsCompanyInfo(state, action: PayloadAction<boolean>) {
      state.needsCompanyInfo = action.payload;
    },
    clearCompanyInfo(state) {
      state.companyInfo = null;
      state.needsCompanyInfo = true;
    }
  }
});

export const { setCompanyInfo, setNeedsCompanyInfo, clearCompanyInfo } = companySlice.actions;
export default companySlice.reducer; 