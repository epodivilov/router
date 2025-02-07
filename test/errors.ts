import { createRouter, openPage, redirectPage } from '../index.js'

let router = createRouter({
  home: '/',
  create: [/\/post\/(new|draft)/, type => ({ mode: 'editor', id: 123 })],
  post: '/post/:id',
  exit: '/exit'
} as const)

router.subscribe(page => {
  if (!page) {
    console.log('404')
  } else if (page.route === 'post') {
    // THROWS Property 'type' does not exist on type 'Record<"id", string>'
    router.open(`/post/${page.params.type}`)
    // THROWS '"exit" | "create" | "home"' and '"creat"' have no overlap
  } else if (page.route === 'creat') {
    console.log('create')
  }
})

router.subscribe(page => {
  // THROWS is possibly 'undefined'
  console.log(page.route)
})

// THROWS Argument of type '{ id: string; category: string; }' is not assignable to parameter of type 'Record<"id", string>'.
openPage(router, 'post', { id: '1', category: 'guides' })
// THROWS Expected 2 arguments, but got 3
openPage(router, 'home', { id: '1' })

// THROWS Type 'string' is not assignable to type 'number'.
openPage(router, 'create', { id: '1' })
// THROWS Expected 3 arguments, but got 2.
openPage(router, 'create')

// THROWS Argument of type '{ id: string; category: string; }' is not assignable to parameter of type 'Record<"id", string>'.
redirectPage(router, 'post', { id: '1', category: 'guides' })
// THROWS Expected 2 arguments, but got 3
redirectPage(router, 'home', { id: '1' })

// THROWS Property 'set' does not exist on type
router.set({ route: 'home', params: {}, path: '/' })
