import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../migrations/mysql';
import { Product } from './product';

export interface brandData extends Model {
    id: number;
    name: string;
}

export const Brand = sequelize.define<brandData>(
    'brandData',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'brand',
        timestamps: false,
    },
);
sequelize.sync();
