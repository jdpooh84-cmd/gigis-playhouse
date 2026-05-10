import { describe, it, expect } from 'vitest';
import { calculateSM2, getInitialSM2State, mapResponseToQuality, getBucketFromSM2 } from './sm2';

describe('SM-2 Spaced Repetition Algorithm', () => {
  describe('getInitialSM2State', () => {
    it('should return default initial state', () => {
      const state = getInitialSM2State();
      expect(state.easeFactor).toBe(2.5);
      expect(state.intervalDays).toBe(0);
      expect(state.repetitions).toBe(0);
      expect(state.dueAt).toBeInstanceOf(Date);
    });
  });

  describe('mapResponseToQuality', () => {
    it('should map "knew" to quality 5', () => {
      expect(mapResponseToQuality('knew')).toBe(5);
    });

    it('should map "almost" to quality 3', () => {
      expect(mapResponseToQuality('almost')).toBe(3);
    });

    it('should map "learning" to quality 1', () => {
      expect(mapResponseToQuality('learning')).toBe(1);
    });
  });

  describe('calculateSM2', () => {
    it('should set interval to 1 day on first correct answer', () => {
      const initial = getInitialSM2State();
      const result = calculateSM2(initial, 5);
      
      expect(result.intervalDays).toBe(1);
      expect(result.repetitions).toBe(1);
      expect(result.easeFactor).toBeGreaterThanOrEqual(2.5);
    });

    it('should set interval to 3 days on second correct answer', () => {
      const state = { easeFactor: 2.5, intervalDays: 1, repetitions: 1, dueAt: new Date() };
      const result = calculateSM2(state, 5);
      
      expect(result.intervalDays).toBe(3);
      expect(result.repetitions).toBe(2);
    });

    it('should multiply interval by ease factor on subsequent correct answers', () => {
      const state = { easeFactor: 2.5, intervalDays: 3, repetitions: 2, dueAt: new Date() };
      const result = calculateSM2(state, 5);
      
      expect(result.intervalDays).toBe(8); // round(3 * 2.5) = 8
      expect(result.repetitions).toBe(3);
    });

    it('should reset on incorrect answer (quality < 3)', () => {
      const state = { easeFactor: 2.5, intervalDays: 10, repetitions: 5, dueAt: new Date() };
      const result = calculateSM2(state, 1);
      
      expect(result.intervalDays).toBe(1);
      expect(result.repetitions).toBe(0);
    });

    it('should decrease ease factor on difficult answers', () => {
      const state = { easeFactor: 2.5, intervalDays: 1, repetitions: 1, dueAt: new Date() };
      const result = calculateSM2(state, 3); // "almost" - harder
      
      expect(result.easeFactor).toBeLessThan(2.5);
      expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
    });

    it('should increase ease factor on easy answers', () => {
      const state = { easeFactor: 2.5, intervalDays: 1, repetitions: 1, dueAt: new Date() };
      const result = calculateSM2(state, 5); // "knew" - easy
      
      expect(result.easeFactor).toBeGreaterThanOrEqual(2.5);
    });

    it('should never let ease factor drop below 1.3', () => {
      let state = { easeFactor: 1.3, intervalDays: 1, repetitions: 0, dueAt: new Date() };
      
      // Multiple incorrect answers
      for (let i = 0; i < 5; i++) {
        const result = calculateSM2(state, 0);
        expect(result.easeFactor).toBeGreaterThanOrEqual(1.3);
        state = result;
      }
    });

    it('should cap interval at 180 days', () => {
      const state = { easeFactor: 2.5, intervalDays: 100, repetitions: 10, dueAt: new Date() };
      const result = calculateSM2(state, 5);
      
      expect(result.intervalDays).toBeLessThanOrEqual(180);
    });

    it('should set dueAt to future date based on interval', () => {
      const initial = getInitialSM2State();
      const result = calculateSM2(initial, 5);
      
      const now = new Date();
      const expectedDue = new Date(now);
      expectedDue.setDate(expectedDue.getDate() + result.intervalDays);
      
      // Allow 1 second tolerance
      expect(Math.abs(result.dueAt.getTime() - expectedDue.getTime())).toBeLessThan(1000);
    });
  });

  describe('getBucketFromSM2', () => {
    it('should return bucket 1 for new cards', () => {
      expect(getBucketFromSM2({ easeFactor: 2.5, intervalDays: 0, repetitions: 0, dueAt: new Date() })).toBe(1);
    });

    it('should return bucket 2 for short intervals', () => {
      expect(getBucketFromSM2({ easeFactor: 2.5, intervalDays: 2, repetitions: 1, dueAt: new Date() })).toBe(2);
    });

    it('should return bucket 3 for medium intervals', () => {
      expect(getBucketFromSM2({ easeFactor: 2.5, intervalDays: 5, repetitions: 2, dueAt: new Date() })).toBe(3);
    });

    it('should return bucket 4 for longer intervals', () => {
      expect(getBucketFromSM2({ easeFactor: 2.5, intervalDays: 14, repetitions: 3, dueAt: new Date() })).toBe(4);
    });

    it('should return bucket 5 for mastered cards', () => {
      expect(getBucketFromSM2({ easeFactor: 2.5, intervalDays: 30, repetitions: 5, dueAt: new Date() })).toBe(5);
    });
  });

  describe('Full learning progression', () => {
    it('should progress a card from new to mastered with consistent correct answers', () => {
      let state = getInitialSM2State();
      
      // Simulate 7 consecutive "knew" answers
      for (let i = 0; i < 7; i++) {
        state = calculateSM2(state, 5);
      }
      
      // After 7 perfect reviews, should have high interval and bucket 5
      expect(state.intervalDays).toBeGreaterThan(21);
      expect(state.repetitions).toBe(7);
      expect(getBucketFromSM2(state)).toBe(5);
    });

    it('should handle mixed responses realistically', () => {
      let state = getInitialSM2State();
      
      // knew, knew, almost, knew, learning, knew, knew
      const responses = [5, 5, 3, 5, 1, 5, 5];
      
      for (const quality of responses) {
        state = calculateSM2(state, quality);
      }
      
      // Should still make progress but slower
      expect(state.repetitions).toBeGreaterThan(0);
      expect(state.easeFactor).toBeGreaterThanOrEqual(1.3);
    });
  });
});
