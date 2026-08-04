import {createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export function useModal () {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider")
    }
    return context;
}