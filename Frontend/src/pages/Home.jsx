import { CustomerProvider } from "../providers/CustomerProvider";
import { DebtProvider } from "../providers/DebtProvider";
import FullCustomerDashboard from "../components/FullCustomerDashboard";
import { ModalProvider } from  "../providers/ModalProvider"

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
