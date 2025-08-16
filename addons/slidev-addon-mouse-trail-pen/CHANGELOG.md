# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-08-16

### Added
- Initial release of slidev-addon-mouse-trail-pen
- Beautiful mouse trail pen effects for Slidev presentations
- Multiple color presets: blue, green, purple, red, orange, pink, rainbow, fire, ocean, ink
- Custom configuration support for colors, trail length, fade duration, and line width
- Automatic page detection and configuration switching
- Smooth bezier curve animations
- Performance optimized with requestAnimationFrame
- Zero configuration setup - works out of the box
- Responsive design that adapts to window resizing

### Features
- **Color Presets**: 10 built-in color schemes including the new ink preset
- **Custom Colors**: Support for custom RGBA color gradients
- **Page-specific Configuration**: Different colors for different slides
- **Smooth Animation**: Bezier curves for natural pen-like movement
- **Auto Fade**: Trail points disappear naturally over time
- **Performance Optimized**: Efficient rendering with minimal impact
- **Easy Integration**: Simple addon installation for Slidev

### Technical Details
- Canvas-based rendering for smooth performance
- Fixed positioning to cover entire viewport
- Pointer events disabled to not interfere with interactions
- Automatic cleanup when navigating between slides
- TypeScript support with proper type definitions
