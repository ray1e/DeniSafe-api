# Redux Toolkit (RTK) Lifecycle Flow

## 1. Setup & Generation Phase (Runs once when app loads)

* `createSlice({ name: "customer", reducers: { setCustomerName } })`
  ↓
* **RTK generates the action type string:** `"customer/setCustomerName"`
  ↓
* **RTK creates the action creator function:**  
  `customerSlice.actions.setCustomerName = (payload) => ({ type: "customer/setCustomerName", payload })`
  ↓
* **RTK generates the main reducer function and wires the action type to your logic:**  
  `export default customerSlice.reducer`
  ↓
* **Reducer is plugged into the store:**  
  `configureStore({ reducer: { customer: customerSlice.reducer } })`

---

## 2. Runtime & Dispatch Phase (Runs every time a user interacts)

* **User triggers an event in UI:** (e.g., types `"Alice"` into an `<input />`)
  ↓
* **Action creator is called:** `setCustomerName("Alice")`
  ↓
* **Action object is generated:** `{ type: "customer/setCustomerName", payload: "Alice" }`
  ↓
* **Component dispatches the object:** `dispatch({ type: "customer/setCustomerName", payload: "Alice" })`
  ↓
* **Redux Store receives the action** and forwards it to the root reducer
  ↓
* **Reducer matches the type:** Store identifies `"customer/setCustomerName"` and runs your reducer function:  
  `setCustomerName(currentState, { type: "customer/setCustomerName", payload: "Alice" })`
  ↓
* **Logic executes:** `state.customerData.name = "Alice"` *(Immer safely creates a new immutable state object)*
  ↓
* **Redux Store saves the new state**
  ↓
* **React re-renders components** reading `customerData.name` via `useSelector`