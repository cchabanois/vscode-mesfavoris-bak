import { PathPlaceholderResolver } from '../PathPlaceholderResolver';
import { PathPlaceholder } from '../PathPlaceholder';

describe('PathPlaceholderResolver', () => {
    let mappings : Map<string, PathPlaceholder>;
    let pathPlaceholderResolver : PathPlaceholderResolver;
    beforeEach(() => {
        mappings = new Map();
        pathPlaceholderResolver = new PathPlaceholderResolver(() => mappings);
    });
    describe('Collapse', () => {
        it('should collapse paths', () => {
            // Given
            mappings.set('HOME', new PathPlaceholder('HOME', '/home/cchabanois'));
            mappings.set('BLT', new PathPlaceholder('BLT', '/home/cchabanois/blt'));
    
            // When
            const result = pathPlaceholderResolver.collapse('/home/cchabanois/blt/app/main/core');
    
            // Then
            expect(result).toBe('${BLT}/app/main/core');
        });
        test('collapse with given place holder', () => {
            // Given
            mappings.set('HOME', new PathPlaceholder('HOME', '/home/cchabanois'));
            mappings.set('BLT', new PathPlaceholder('BLT', '/home/cchabanois/blt'));
    
            // When
            const result = pathPlaceholderResolver.collapse('/home/cchabanois/blt/app/main/core', ['HOME']);
    
            // Then
            expect(result).toBe('${HOME}/blt/app/main/core');
        });
    });
    describe('Expand', () => {
        test('expand a collapsed path', () => {
            // Given
            mappings.set('HOME', new PathPlaceholder('HOME', '/home/cchabanois'));
            mappings.set('BLT', new PathPlaceholder('BLT', '/home/cchabanois/blt'));
    
            // When
            const result = pathPlaceholderResolver.expand('${BLT}/app/main/core');
    
            // Then
            expect(result).toBe('/home/cchabanois/blt/app/main/core');
        });
    });

});