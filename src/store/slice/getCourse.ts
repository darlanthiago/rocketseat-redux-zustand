import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/axios";

// First, create the thunk
const fetchCourseById = createAsyncThunk(
  "player/fetchCourseById",
  async (courseId: number) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  }
);

export { fetchCourseById };
