import ActiveDebtTab from "../components/ActiveDebtTab";
import CustomerListing from "../components/CustomerListing";
import CustomerProfile from "../components/CustomerProfile";
import Header from "../components/Header"

function Home () {
    return(
        <div>
            <Header/>
            <main className="flex flex-col md:flex-row w-full min-h-screen">
                <div className="md:w-85 md:shrink-0 w-full">
                  <CustomerListing/>  
                </div>
                
                <div className="flex-1 min-w-0 gap-3 flex flex-col">
                   <CustomerProfile/> 
                   <ActiveDebtTab/>
                </div>
                
            </main>
            
        </div>
    )
}

export default Home;