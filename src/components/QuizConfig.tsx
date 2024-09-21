import React, { useEffect, useState } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { fetchCategories } from '../services/apis';
import { Difficulty } from '../utils/constants';

import {
  Input,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react';
import Loading from './Loading';

const defaultCategories = [
  {
    id: -1,
    name: '',
  },
];

const QuizConfig: React.FC = () => {
  const [categories, setCategories] = useState(defaultCategories);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    alias,
    category,
    difficulty,
    setAlias,
    setCategory,
    setDifficulty,
    isAliasValid,
    setIsAliasValid,
  } = useQuizContext();

  const handleAliasBlur = () => setIsAliasValid(alias.trim() !== '');

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    setAlias('');
    setIsAliasValid(true);
    setCategory(defaultCategories[0]);
    setDifficulty('');
  }, [categories]);

  return (
    <Flex flexDirection="column" gap={2}>
      <Loading isLoading={isLoading}  />
      <FormControl isRequired isInvalid={!isAliasValid} isDisabled={isLoading}>
        <FormLabel>Alias</FormLabel>
        <Input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          onBlur={handleAliasBlur}
        />
        {!isAliasValid && <FormErrorMessage>Alias is required.</FormErrorMessage>}
      </FormControl>
      <FormControl isDisabled={isLoading}>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Any category"
          value={category?.id}
          onChange={
            (e) => setCategory(categories.find((cat) => cat.id.toString() === e.target.value) || { id: -1, name: '' })
          }
        >
          {categories.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isDisabled={isLoading}>
        <FormLabel>Difficulty</FormLabel>
        <Select
          placeholder="Any difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {Object.values(Difficulty).map((difficultyLevel) => (
            <option key={difficultyLevel} value={difficultyLevel.toLocaleUpperCase()}>
              {difficultyLevel}
            </option>
          ))}
        </Select>
      </FormControl>
    </Flex>
  );
};

export default QuizConfig;