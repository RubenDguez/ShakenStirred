import { useCallback, useContext, useRef, useState } from 'react';
import useAuthorization from '../../../hooks/useAuthorization';
import styles from './newDrink.module.css';
import { IoAddOutline } from 'react-icons/io5';
import UploadWidget from '../../../components/UploadWidget';
import { AppContext } from '../../../App';
import { createDrink } from '../../../api/drinkAPI';

export default function NewDrink() {
  const [error, setError] = useState('');

  const drinkNameRef = useRef<HTMLInputElement>(null);
  const drinkCatRef = useRef<HTMLInputElement>(null);
  const drinkInstructionsRef = useRef<HTMLTextAreaElement>(null);

  const [image, setImage] = useState('/generic-image.jpg');
  const [ingredients, setIngredients] = useState<Array<{ amount: number; unit: string; name: string }>>([]);
  const app = useContext(AppContext);
  const { getJwt } = useAuthorization();

  const handleCreateDrink = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const name = drinkNameRef.current?.value || '';
      const category = drinkCatRef.current?.value || '';
      const instructions = drinkInstructionsRef.current?.value || '';
      const img = image === '/generic-image.jpg' ? '' : image;

      if (!name || !category || !instructions || ingredients.length <= 0) {
        setError('Please fill in all fields');
        return;
      }

      const data = { user: app?.id, name, category, instructions, ingredients, img };
      try {
        const response = await createDrink(data, getJwt()!);
        if (response) setError('Drink was successfully created.');
      } catch (error) {
        const ERROR = error as Error;
        setError(ERROR.message);
      }
    },
    [ingredients, image, app, getJwt],
  );

  return (
    <section className={`${styles.page}`}>
      <h2 className={`${styles.header}`}>Create a New Drink</h2>
      {error !== '' && <h4 className={`${styles.error}`}>{error}</h4>}

      <div className={`${styles.form}`}>
        <div className={`${styles.drinkImageGroup}`}>
          <div>
            <div className={styles.drinkImage} style={{ backgroundImage: `url(${image})` }}></div>
            <UploadWidget setImage={setImage}>Upload Image</UploadWidget>
          </div>
        </div>

        <div className={`${styles.formField}`}>
          <label htmlFor="drink-name">Name</label>
          <input ref={drinkNameRef} type="text" name="drink-name" id="drink-name" />
        </div>
        <div className={`${styles.formField}`}>
          <label htmlFor="drink-category">Category</label>
          <input ref={drinkCatRef} type="text" name="drink-category" id="drink-category" />
        </div>

        <IngredientsForm ingredients={ingredients} setIngredients={setIngredients} setError={setError} />

        <table className={`${styles.ingredientsTable}`}>
          <tbody>
            {ingredients.length > 0 &&
              ingredients.map((ingredient) => (
                <tr key={ingredient.name}>
                  <td>{ingredient.amount}</td>
                  <td>{ingredient.unit}</td>
                  <td>{ingredient.name}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className={`${styles.formField}`}>
          <label htmlFor="drink-instructions">Instructions</label>
          <textarea ref={drinkInstructionsRef} name="drink-instructions" id="drink-instructions" rows={5} />
        </div>
        <div className={`${styles.formActions}`}>
          <button onClick={(e) => handleCreateDrink(e)} type="submit">
            Save
          </button>
        </div>
      </div>
    </section>
  );
}

function IngredientsForm({
  ingredients,
  setIngredients,
  setError,
}: {
  ingredients: Array<{ amount: number; unit: string; name: string }>;
  setIngredients: React.Dispatch<
    React.SetStateAction<
      {
        amount: number;
        unit: string;
        name: string;
      }[]
    >
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const ingFormRef = useRef<HTMLFormElement>(null);
  const ingAmountRef = useRef<HTMLInputElement>(null);
  const ingUnitRef = useRef<HTMLInputElement>(null);
  const ingNameRef = useRef<HTMLInputElement>(null);
  const addIngButtonRef = useRef<HTMLButtonElement>(null);

  const handleAddIngredient = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const amount = ingAmountRef.current?.value || '0';
      const unit = ingUnitRef.current?.value;
      const name = ingNameRef.current?.value;

      if (!amount || !unit || !name) {
        setError('Please fill in all ingredient information');
        return;
      }

      setIngredients([...ingredients, { amount: parseFloat(amount), unit, name }]);
      ingFormRef.current?.reset();
      ingAmountRef.current?.focus();
    },
    [ingredients, setError, setIngredients],
  );

  return (
    <div className={`${styles.formField}`}>
      <label htmlFor="drink-category">Ingredients</label>
      <form ref={ingFormRef} className={`${styles.ingredientsForm}`}>
        <div className={`${styles.ingFormField}`}>
          <label htmlFor="ingredient-amount">Amount</label>
          <input ref={ingAmountRef} type="text" id="ingredient-amount" />
        </div>
        <div className={`${styles.ingFormField}`}>
          <label htmlFor="ingredient-unit">Unit</label>
          <input ref={ingUnitRef} type="text" id="ingredient-unit" />
        </div>
        <div className={`${styles.ingFormField}`}>
          <label htmlFor="ingredient-name">Name</label>
          <input ref={ingNameRef} type="text" id="ingredient-name" />
        </div>
        <div className={`${styles.addIngredientGroup}`}>
          <IoAddOutline onClick={() => addIngButtonRef.current?.click()} className={`${styles.addIngredientButtonPlus}`} />
          <button ref={addIngButtonRef} className={`${styles.addIngredientButton}`} type="submit" onClick={(e) => handleAddIngredient(e)}></button>
        </div>
      </form>
    </div>
  );
}
