import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const AllActions = {};

export const useActions = () => bindActionCreators(AllActions, useDispatch());
