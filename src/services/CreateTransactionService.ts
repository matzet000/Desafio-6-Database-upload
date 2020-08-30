import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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

    const { total } = await transactionsRepository.getBalance();

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Invalid type format');
    }

    if (type === 'outcome' && total < value) {
      throw new AppError('Invalid value value above total');
    }

    let categoryTransaction = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!categoryTransaction) {
      categoryTransaction = await categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryTransaction);
    }

    const transaction = await transactionsRepository.create({
      title,
      value,
      type,
      category: categoryTransaction,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
