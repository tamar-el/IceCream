// import styles from './FlavorCard.module.css'
// const FlavorCard = ({ flavor }) => {

//     return (
//         <>
//             <div className={styles.card}>
//                 <h3>{flavor.name}</h3>

//                 <p>Scoops: {flavor.scoopsSelected}</p>
//                 {flavor.isSoldOut && (
//                     <span className={styles.soldOutBadge}>
//                         Sold Out
//                     </span>
//                 )}


//             </div>


//         </>
//     );
// }

// export default FlavorCard;


import styles from './FlavorCard.module.css';

const FlavorCard = ({
  flavor,
  addScoop,
  removeScoop,
  totalScoops,
  scoopLimit,
}) => {
  return (
    <div className={`${styles.card} ${flavor.isSoldOut ? styles.soldOut : ''}`}>
      <h3>{flavor.name}</h3>

      {flavor.isSoldOut && (
        <span className={styles.soldOutBadge}>
          Sold Out
        </span>
      )}

      <p>Scoops: {flavor.scoopsSelected}</p>

      <button
        onClick={() => removeScoop(flavor.id)}
        disabled={flavor.isSoldOut || flavor.scoopsSelected === 0}
      >
        -
      </button>

      <button
        onClick={() => addScoop(flavor.id)}
        disabled={flavor.isSoldOut || totalScoops >= scoopLimit}
      >
        +
      </button>
    </div>
  );
};

export default FlavorCard;
