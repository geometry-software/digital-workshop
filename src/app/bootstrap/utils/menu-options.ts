interface MenuOption {
  title?: string
  icon?: string
  link?: string
  roles?: string[]
}

export const menuOptions: Array<MenuOption> = [
  {
    title: 'Users',
    icon: 'user',
    link: 'users',
  },
  {
    title: 'Clients',
    icon: 'meh',
    link: 'clients',
  },
  {
    title: 'Spares',
    icon: 'shopping-cart',
    link: 'spares',
  },
  {
    title: 'Orders',
    icon: 'car',
    link: 'orders',
  },
]
