import type { Course } from './clock.ts'
import type { MarkName } from './Marks.tsx'

export interface Dish {
  name: string
  note: string
  price: string
  tags?: string
}

export interface Group {
  title: string
  mark: MarkName
  dishes: Dish[]
  extra?: string
}

export const COURSE_TITLE: Record<Course, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
}

export const COURSE_HOURS: Record<Course, string> = {
  breakfast: 'served from 7 until 11:30',
  lunch: 'served from 11:30 until the kitchen closes',
}

export const MENU: Record<Course, Group[]> = {
  breakfast: [
    {
      title: 'Eggs',
      mark: 'egg',
      dishes: [
        { name: 'Eggs your way', note: 'Free-range, on buttered sourdough. Add bacon or roasted tomato for 4.', price: '14', tags: 'v' },
        { name: 'Sorrel and ricotta omelette', note: 'Three eggs, young sorrel, lemon, a little green sauce.', price: '19', tags: 'v, gf' },
        { name: 'Roast pumpkin on rye', note: 'Beetroot relish, a poached egg, toasted seeds.', price: '20', tags: 'v' },
        { name: 'The Slate Board', note: 'Bacon, sausage, two eggs, tomato, mushrooms, toast.', price: '24' },
      ],
    },
    {
      title: 'Sweet and plain',
      mark: 'lemon',
      dishes: [
        { name: 'Buttermilk pikelets', note: 'Lemon curd, whipped cream.', price: '17', tags: 'v' },
        { name: 'Porridge', note: 'Stewed fruit of the week, brown sugar.', price: '12', tags: 'v' },
        { name: 'Toast and jam', note: 'Two slices of sourdough, house jam.', price: '7', tags: 'v' },
      ],
      extra: 'On the chalkboard: one baked special a day, written up by the pass. Ask at the counter.',
    },
  ],
  lunch: [
    {
      title: 'Plates',
      mark: 'loaf',
      dishes: [
        { name: 'Soup of the day', note: 'Whatever is good this week, with a hunk of bread.', price: '13', tags: 'v' },
        { name: 'Ham, cheddar and pickle toastie', note: 'On sourdough, with a little salad.', price: '14' },
        { name: 'Slow-cooked beef pie', note: 'Mash and buttered greens.', price: '22' },
        { name: 'Pumpkin, feta and sage tart', note: 'Rocket and lemon dressing.', price: '21', tags: 'v' },
        { name: 'Ploughman’s board', note: 'Two cheeses, ham, pickles, apple, bread.', price: '26' },
      ],
    },
    {
      title: 'Greens and sweet',
      mark: 'leaf',
      dishes: [
        { name: 'Garden salad bowl', note: 'Leaves, beetroot, seeds, lemon dressing.', price: '16', tags: 'v, gf' },
        { name: 'Lemon tart', note: 'Sharp curd, short pastry, cream.', price: '9', tags: 'v' },
        { name: 'Flourless orange cake', note: 'Served with yoghurt.', price: '9', tags: 'v, gf' },
      ],
    },
  ],
}

export const DRINKS: Dish[] = [
  { name: 'Flat white or latte', note: 'Dairy, oat or soy.', price: '4.80' },
  { name: 'Pot of tea', note: 'Black, green or herbal.', price: '5' },
  { name: 'Cold-pressed apple juice', note: '', price: '6' },
]

export const PRODUCE: { mark: MarkName; name: string; line: string; size: number; lead?: boolean }[] = [
  { mark: 'leaf', name: 'Sorrel', line: 'Sharp and lemony, and where the name comes from. It goes in the omelette and the green sauce.', size: 280, lead: true },
  { mark: 'egg', name: 'Eggs', line: 'From hens on a small farm nearby, for eggs your way.', size: 78 },
  { mark: 'pumpkin', name: 'Pumpkin', line: 'Roasted for the tart and the rye, while the season lasts.', size: 104 },
  { mark: 'lemon', name: 'Lemons', line: 'For the curd on the pikelets, the lemon tart and the dressing.', size: 72 },
  { mark: 'beet', name: 'Beetroot', line: 'Roasted, then turned into the relish and the salad bowl.', size: 88 },
  { mark: 'loaf', name: 'Sourdough', line: 'Baked fresh and here by seven, for the toast and the toastie.', size: 96 },
]
