import { EditorSliceActions } from "@/app/store/slices/editor/editor.slice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const AllActions = {
  ...EditorSliceActions,
};

export const useActions = () => bindActionCreators(AllActions, useDispatch());
