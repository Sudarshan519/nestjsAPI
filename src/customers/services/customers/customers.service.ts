import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {

    customers = [
        {
            id: 1,
            email: 'danny@gmail.com',
            name: 'danny'
        },
        {
            id: 2,
            email: 'adam@gmail.com',
            name: 'adam'
        },
        {
            id: 2,
            email: 'spencer@gmail.com',
            name: 'spencer'
        },
    ];
    findCustomer() {
        return {
            id: 1,
            email: 'day@gmail.com',
            createdAt: new Date(),
        };
    }

    findCustomerById(id: number) {
        return this.customers.find((user) => user.id === id);
    }

    createCustomer(customerDto: CreateCustomerDto) {
        this.customers.push(customerDto);
    }

    getCustomers() {
        
        return this.customers;

    }
}
