import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: string;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Invalid type form');
    }

    const categoryExists = categoriesRepository.findOne({
      where: { category },
    });

    if (!categoryExists) {
      const categoryCreated = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryCreated);

      const transaction = await transactionsRepository.create({
        title,
        value,
        type,
        category_id: categoryCreated.id as string,
      });

      await transactionsRepository.save(categoryCreated);

      return transaction as Transaction;
    }

    const tmep = {
      title,
      value,
      type,
      category_id: categoryExists.id as string,
    } as Transaction;

    const transaction = await transactionsRepository.create();

    await transactionsRepository.save(transaction);

    return transaction as Transaction;
  }
}

export default CreateTransactionService;
