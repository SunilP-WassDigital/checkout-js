import React, { FunctionComponent, useState} from 'react';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import { Button, ButtonVariant } from '../ui/button';
import { TextInput } from '@bigcommerce/checkout/ui';

interface PetStepProps {
  handleSubmit: (formData: { animalName: string; petSelection: string }) => void;
}


const PetStep: FunctionComponent<PetStepProps> = ({ handleSubmit }) => {
  const storedValue = localStorage.getItem('petInformation');
  const { animalName = '', petSelection = 'Test1' } = storedValue ? JSON.parse(storedValue) : {};
  const [animalName, setAnimalName] = useState<string>(animalName);
  const [petSelection, setPetSelection] = useState<string>(petSelection);

  const handleAnimalNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimalName(e.target.value);
  };

  const handlePetSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPetSelection(event.target.value);
  };

  const handleButtonClick = () => {
    const formData = {
      animalName,
      petSelection,
    };
    handleSubmit(formData);
  };

  // Define handleSubmit as a function inside the component

  return (
    <>
      <h2>Pet and Vet Information</h2>

      {/* Input fields */}
      <div>
        <TextInput type="text" name="animal_name" placeholder="Enter Animal Name" value={animalName}
                   onChange={handleAnimalNameChange} />
      </div>

      <div>
        <select name="pet_selection" value={petSelection}   onChange={handlePetSelectionChange}>
          <option value="Test1">Test1</option>
          <option value="Test2">Test2</option>
          <option value="Test3">Test3</option>
          <option value="Test4">Test4</option>
        </select>
      </div>

      {/* Button */}
      <div className="form-actions">
        <Button
          id="checkout-pet-continue"
          type="button"  // Use type="button" to prevent form submission (we're not using a form here)
          onClick={handleButtonClick} // Call handleSubmit on button click
          variant={ButtonVariant.Primary}
        >
          <TranslatedString id="common.continue_action" />
        </Button>
      </div>
    </>
  );
};

export default PetStep;