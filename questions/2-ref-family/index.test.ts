import type { Ref } from "vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"

import RefFamily from "./App.vue"

interface RefFamilyType {
  count: Ref<number>
  initial: Ref<number>
  update: (value: number) => void
  initialCount: (value: number | Ref<number>) => number
  state: {foo: number; bar: number}
  fooRef: Ref<number>
}

describe("RefFamily", () => {
  it("update ref function", () => {
    const wrapper = mount(RefFamily);
    (wrapper.vm as unknown as RefFamilyType).update(996)
    expect((wrapper.vm as unknown as RefFamilyType).count).toMatchInlineSnapshot('0')
  })

  it("Unwrap ref", () => {
    const wrapper = mount(RefFamily)
    expect((wrapper.vm as unknown as RefFamilyType).initialCount(996)).toMatchInlineSnapshot('undefined')
    expect((wrapper.vm as unknown as RefFamilyType).initialCount(ref(996))).toMatchInlineSnapshot('undefined')
  })

  it("create a ref for a property on a source reactive object", () => {
    const wrapper = mount(RefFamily)
    expect((wrapper.vm as unknown as RefFamilyType).fooRef).toMatchInlineSnapshot('NaN')
    expect((wrapper.vm as unknown as RefFamilyType).state.foo).toMatchInlineSnapshot('2')
  })
})
