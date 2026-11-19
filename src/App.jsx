import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/Header.jsx'
import OrderSummary from './components/OrderSummary.jsx'
import FlavorCard from './components/FlavorCard.jsx'

function App() {
  const [flavors, setFlavors] = useState([
    { id: 1, name: 'Vanilla', isSoldOut: false, scoopsSelected: 0 },
    { id: 2, name: 'Chocolate', isSoldOut: false, scoopsSelected: 0 },
    { id: 3, name: 'Strawberry', isSoldOut: false, scoopsSelected: 0 },
    { id: 4, name: 'Pistachio', isSoldOut: true, scoopsSelected: 0 },
    { id: 5, name: 'Cookie Dough', isSoldOut: false, scoopsSelected: 0 },
  ]);

  const [scoopLimit, setScoopLimit] = useState(5);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const totalScoops = flavors.reduce((total, flavor) => {
    return total + flavor.scoopsSelected;
  }, 0);

  function addScoop(flavorId) {
    if (totalScoops >= scoopLimit) {
      return;
    }

    setFlavors((prevFlavors) =>
      prevFlavors.map((flavor) =>
        flavor.id === flavorId && !flavor.isSoldOut
          ? {
              ...flavor,
              scoopsSelected: flavor.scoopsSelected + 1,
            }
          : flavor
      )
    );
  }

  function removeScoop(flavorId) {
    setFlavors((prevFlavors) =>
      prevFlavors.map((flavor) =>
        flavor.id === flavorId && flavor.scoopsSelected > 0
          ? {
              ...flavor,
              scoopsSelected: flavor.scoopsSelected - 1,
            }
          : flavor
      )
    );
  }

  const visibleFlavors = showOnlyAvailable
    ? flavors.filter((flavor) => !flavor.isSoldOut)
    : flavors;

  return (
    <div className="app">
      <Header />

      <main>
        <label>
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(event) =>
              setShowOnlyAvailable(event.target.checked)
            }
          />
          Show only available flavors
        </label>

        {totalScoops >= scoopLimit && (
          <p className="limitWarning">
            You have reached the scoop limit!
          </p>
        )}

        <div className="flavors">
          {visibleFlavors.length === 0 ? (
            <p>No flavors to show</p>
          ) : (
            visibleFlavors.map((flavor) => (
              <FlavorCard
                key={flavor.id}
                flavor={flavor}
                addScoop={addScoop}
                removeScoop={removeScoop}
                totalScoops={totalScoops}
                scoopLimit={scoopLimit}
              />
            ))
          )}
        </div>

        <OrderSummary totalScoops={totalScoops} />

        <button
          onClick={() =>
            setFlavors((prevFlavors) =>
              prevFlavors.map((flavor) => ({
                ...flavor,
                scoopsSelected: 0,
              }))
            )
          }
        >
          Clear Order
        </button>
      </main>
    </div>
  );
}

export default App;