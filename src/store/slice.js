import {createSlice} from "@reduxjs/toolkit"
import { timeSlotsData } from "../mock";

const slice =createSlice({
    name:"booking",
    initialState:{
        bookingList :[],
        timeSlot:timeSlotsData
    },
    reducers:{
        addNew: (state, { payload }) => {
            state.bookingList = [...state.bookingList, payload];
          },
          updateTimeSlot:(state,{payload})=>{
            state.timeSlot = state.timeSlot.map((slot) =>
      slot.id === payload ? { ...slot, available: !slot.available } : slot
    );
          }
    }
})

export const  {
    addNew,
    updateTimeSlot

} = slice.actions;

export default slice.reducer