import { shallowMount } from '@vue/test-utils'
import Vue2SimpleMenu from '@/vue2-simple-menu.vue'

describe('Vue2SimpleMenu.vue', () => {
  it('Sets props correctly', async () => {
    let initialPropsData = {
      options: [
        {
          name: 'Duplicate',
          slug: 'duplicate'
        },
        {
          name: 'Edit',
          slug: 'edit'
        },
        {
          name: 'Delete',
          slug: 'delete'
        }
      ]
    }

    const wrapper = shallowMount(Vue2SimpleMenu, {
      propsData: {
        options: initialPropsData.options
      }
    })

    expect(wrapper.vm.options).toBe(initialPropsData.options)
  })

  it('Shows menu on click', async () => {
    let initialPropsData = {
      options: [
        {
          name: 'Duplicate',
          slug: 'duplicate'
        },
        {
          name: 'Edit',
          slug: 'edit'
        },
        {
          name: 'Delete',
          slug: 'delete'
        }
      ]
    }

    const wrapper = shallowMount(Vue2SimpleMenu, {
      propsData: {
        options: initialPropsData.options
      }
    })

    // Make some test data
    var testEvent = new Event("click", { "bubbles": true, "cancelable": false });
    testEvent = {
      ...testEvent,
      target: document.createElement("div")
    }
    let testItem = { name: 'Jim', job: 'Salesman' }

    // Trigger the showing of the menu
    wrapper.vm.showMenu(testEvent, testItem)

    // Menu show be showing our selected item
    expect(wrapper.vm.item.name).toBe('Jim')
    expect(wrapper.vm.item.name).toBe('Jim')
  })

  it('Emits event on menu item selection', async () => {
    let initialPropsData = {
      options: [
        {
          name: 'Duplicate',
          slug: 'duplicate'
        },
        {
          name: 'Edit',
          slug: 'edit'
        },
        {
          name: 'Delete',
          slug: 'delete'
        }
      ]
    }

    const wrapper = shallowMount(Vue2SimpleMenu, {
      propsData: {
        options: initialPropsData.options
      }
    })

    // Make some test data
    var testEvent = new Event("click", { "bubbles": true, "cancelable": false });
    testEvent = {
      ...testEvent,
      target: document.createElement("div")
    }
    let testItem = { name: 'Jim', job: 'Salesman' }

    // Trigger the showing of the menu
    wrapper.vm.showMenu(testEvent, testItem)

    // Menu show be showing our selected item
    expect(wrapper.vm.item.name).toBe('Jim')
    expect(wrapper.vm.item.job).toBe('Salesman')

    // Manually click an item on the menu
    // Here we know the options because we set them earlier
    wrapper.vm.optionClicked(initialPropsData[0])

    // Check the event was emitted properly
    expect(wrapper.emitted('option-clicked')).toBeTruthy()
  })
})
