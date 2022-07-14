import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) { }

    @Get(':id')
    getCustomer(
        @Param('id', ParseIntPipe) id: number
    ) {
        const customer = this.customerService.findCustomerById(id);
        console.log(customer);
        if (customer) return customer;
        else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);

    }
    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number) {

        const customer = this.customerService.findCustomerById(id);
        console.log(customer);
        if (customer) return customer;
        else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    @Get('')
    getAllCustomers() {
        return this.customerService.getCustomers();
    }


    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        this.customerService.createCustomer(createCustomerDto);
    }
}
