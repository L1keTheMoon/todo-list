import { expect, afterEach } from 'vitest'
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Расширяем стандартные ожидания Vitest
expect.extend(matchers)

// Очищаем DOM после каждого теста
afterEach(() => {
  cleanup()
})