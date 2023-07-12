import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import authAdminSlice from "../store/actions/admin-auth-slice";
import dashboardSlice from "../store/actions/dashboard-slice";
import addSlice from "../store/actions/add-slice";
import viewcarSlice from "../store/actions/view-car-slice";
import editSlice from "../store/actions/edit-slice";
import tableSlice from "../store/actions/table-slice";
import { BrowserRouter } from "react-router-dom";


export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        authAdminStore: authAdminSlice.reducer,
        dashboardStore: dashboardSlice.reducer,
        tableStore : tableSlice.reducer,
        addStore :addSlice.reducer,
        viewcarStore :viewcarSlice.reducer,
        editcarStore : editSlice.reducer
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
