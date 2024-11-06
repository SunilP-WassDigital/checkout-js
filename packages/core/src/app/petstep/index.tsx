import React, { FunctionComponent, useState, useEffect } from 'react';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import { Button, ButtonVariant } from '../ui/button';
import { TextInput } from '@bigcommerce/checkout/ui';

interface PetStepProps {
  handleSubmit: (formData: Array<{ animalName: string; petSelection: string }>) => void;
}

const PetStep: FunctionComponent<PetStepProps> = ({ handleSubmit }) => {
  const initialPetData = JSON.parse(localStorage.getItem('petInformation') || '[]') || [{ animalName: '', petSelection: 'Test1' }];
  
  const [petData, setPetData] = useState<Array<{ animalName: string; petSelection: string }>>(initialPetData);

  // Save petData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('petInformation', JSON.stringify(petData));
  }, [petData]);

  const handleAnimalNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPetData = [...petData];
    updatedPetData[index].animalName = event.target.value;
    setPetData(updatedPetData);
  };

  const handlePetSelectionChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedPetData = [...petData];
    updatedPetData[index].petSelection = event.target.value;
    setPetData(updatedPetData);
  };

  const handleAddNewClick = () => {
    setPetData([...petData, { animalName: '', petSelection: 'Test1' }]);
  };

  const handleButtonClick = () => {
    handleSubmit(petData);
  };

  return (
    <>
      <h2>Pet and Vet Information</h2>

      {petData.map((pet, index) => (
        <div key={index}>
          <div>
            <TextInput
              type="text"
              name={`animal_name_${index}`}
              placeholder="Enter Animal Name"
              value={pet.animalName}
              onChange={(event) => handleAnimalNameChange(index, event)}
            />
          </div>

          <div>
            <select
              name={`pet_selection_${index}`}
              value={pet.petSelection}
              onChange={(event) => handlePetSelectionChange(index, event)}
            >
              <option value="Test1">Test1</option>
              <option value="Test2">Test2</option>
              <option value="Test3">Test3</option>
              <option value="Test4">Test4</option>
            </select>
          </div>
        </div>
      ))}

      {/* Button to add new pet information fields */}
      <div className="form-actions">
        <Button
          id="add-new-pet"
          type="button"
          onClick={handleAddNewClick}
          variant={ButtonVariant.Secondary}
        >
          Add New
        </Button>
      </div>

      {/* Button to submit all pet information */}
      <div className="form-actions">
        <Button
          id="checkout-pet-continue"
          type="button"
          onClick={handleButtonClick}
          variant={ButtonVariant.Primary}
        >
          <TranslatedString id="common.continue_action" />
        </Button>
      </div>
    </>
  );
};

export default PetStep;