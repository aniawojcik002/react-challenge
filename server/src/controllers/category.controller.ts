import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { CategoryEntity, initialCategories } from '../db/Category';

@ApiBadRequestResponse()
@ApiTags('Category')
@Controller('category')
export class CategoryController implements OnModuleInit {
  constructor(
    @InjectInMemoryDBService('category')
    private readonly categoryService: InMemoryDBService<CategoryEntity>,
  ) {}

  onModuleInit(): any {
    this.categoryService.records = initialCategories;
  }

  @ApiOperation({
    summary: 'Utwórz kategorię',
  })
  @ApiCreatedResponse()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create({
      createdAt: Date.now(),
      ledgerIds: [],
      budgetId: null,
      ...createCategoryDto,
    });
  }

  @ApiOperation({
    summary: 'Znajdź wszystkie kategorię',
  })
  @ApiQuery({
    name: 'unlinkedToBudget',
    description:
      'Jeśli true zwarca tylko kategorie, które nie zostały przypisane do budżetu',
    type: Boolean,
  })
  @ApiNoContentResponse()
  @ApiOkResponse()
  @Get()
  findAll(@Query('unlinkedToBudget') unlinkedToBudget) {
    return this.categoryService
      .query((record) => {
        return unlinkedToBudget ? record.budgetId === null : true;
      })
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  }

  @ApiOperation({
    summary: 'Znajdź kategorię',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator kategorii',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Get(':id')
  findOne(@Param('id') id) {
    return this.categoryService.get(id);
  }

  @ApiOperation({
    summary: 'Edytuj kategorię',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator kategorii',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Patch(':id')
  update(@Param('id') id, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto);
  }

  @ApiOperation({
    summary: 'Usuń kategorię',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator kategorii',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id) {
    return this.categoryService.delete(id);
  }

  @ApiOperation({
    summary: 'Usuń kategorii',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete()
  removeMany(@Body() { ids }) {
    return this.categoryService.deleteMany(ids);
  }
}
