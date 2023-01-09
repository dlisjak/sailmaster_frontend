import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const wrapRouter = (component) => <Router>{component}</Router>;
