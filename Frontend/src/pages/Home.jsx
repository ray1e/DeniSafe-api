import ActiveDebtTab from "../components/ActiveDebtTab";
import { CustomerProvider } from "../components/CustomerProvider";
import CustomerListing from "../components/CustomerListing";
import CustomerProfile from "../components/CustomerProfile";
import { DebtProvider } from "../components/DebtProvider";
import FullCustomerDashboard from "../components/FullCustomerDashboard";
import Header from "../components/Header";
import { ModalProvider } from "../components/ModalProvider";

function Home() {
  return (
    <div>
      <main>
        <CustomerProvider>
            <DebtProvider>
              <ModalProvider>
                <FullCustomerDashboard />
              </ModalProvider>
            </DebtProvider>
        </CustomerProvider>
      </main>
    </div>
  );
}

export default Home;
