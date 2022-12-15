import { choiceDescendensGenerator, choiceAscendensGenerator, bubbleSortAscGenerator, bubbleSortDescGenerator } from './utils';

describe('Тестирование алгоритмов сортировки выбором', () => {
    it('Корректно сортирует пустой массив выбором по уменьшению', () => {
        let itemDefault = choiceDescendensGenerator([])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([])
    })
    it('Корректно сортирует пустой массив выбором по увеличению', () => {
        let itemDefault = choiceAscendensGenerator([])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([])
    })
    it('Корректно сортирует массив из одного элемента выбором по уменьшению', () => {
        let itemDefault = choiceDescendensGenerator([
            { item: 67, state: "default" },
        ])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 67, state: "modified" },
        ])
    })
    it('Корректно сортирует массив из одного элемента выбором по увеличению', () => {
        const itemDefault = choiceAscendensGenerator([
            { item: 67, state: "default" },
        ])
        let arraySort = [];
        for (const item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 67, state: "modified" },
        ])
    })
    it('Корректно сортирует массив из нескольких элементов выбором по уменьшению', () => {
        let itemDefault = choiceDescendensGenerator([
            { item: 67, state: "default" },
            { item: 3, state: "default" },
            { item: 15, state: "default" }
        ])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 67, state: "modified" },
            { item: 15, state: "modified" },
            { item: 3, state: "modified" }
        ])
    })
    it('Корректно сортирует массив из нескольких элементов выбором по увеличению', () => {
        const itemDefault = choiceAscendensGenerator([
            { item: 67, state: "default" },
            { item: 3, state: "default" },
            { item: 15, state: "default" }
        ])
        let arraySort = [];
        for (const item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 3, state: "modified" },
            { item: 15, state: "modified" },
            { item: 67, state: "modified" }
        ])
    })
})

describe('Тестирование алгоритмов сортировки пузырьком', () => {
    it('Корректно сортирует пустой массив пузырьком по уменьшению', () => {
        let itemDefault = bubbleSortDescGenerator([])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([])
    })
    it('Корректно сортирует пустой массив пузырьком по увеличению', () => {
        let itemDefault = bubbleSortAscGenerator([])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([])
    })
    it('Корректно сортирует массив из одного элемента пузырьком по уменьшению', () => {
        let itemDefault = bubbleSortDescGenerator([
            { item: 67, state: "default" },
        ])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 67, state: "modified" },
        ])
    })
    it('Корректно сортирует массив из одного элемента пузырьком по увеличению', () => {
        const itemDefault = bubbleSortAscGenerator([
            { item: 67, state: "default" },
        ])
        let arraySort = [];
        for (const item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 67, state: "modified" },
        ])
    })
    it('Корректно сортирует массив из нескольких элементов пузырьком по уменьшению', () => {
        let itemDefault = bubbleSortDescGenerator([
            { item: 67, state: "default" },
            { item: 3, state: "default" },
            { item: 15, state: "default" }
        ])
        let arraySort = [];
        for (let item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 67, state: "modified" },
            { item: 15, state: "modified" },
            { item: 3, state: "modified" }
        ])
    })
    it('Корректно сортирует массив из нескольких элементов пузырьком по увеличению', () => {
        const itemDefault = bubbleSortAscGenerator([
            { item: 67, state: "default" },
            { item: 3, state: "default" },
            { item: 15, state: "default" }
        ])
        let arraySort = [];
        for (const item of itemDefault) {
            arraySort = item;
        }
        expect(arraySort).toEqual([
            { item: 3, state: "modified" },
            { item: 15, state: "modified" },
            { item: 67, state: "modified" }
        ])
    })
})