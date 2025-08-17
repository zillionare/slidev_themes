# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-08-17

### Fixed
- Fixed "can't access property 'params', currentRoute is undefined" error by adding safe access to Slidev global variables
- Added fallback values for `$page`, `$slidev`, and `$renderContext` to prevent initialization errors
- Improved component stability when Slidev routing system is not fully initialized

### Changed
- Replaced direct access to Slidev globals with safe accessor functions
- Enhanced error handling for component initialization

## [1.0.0] - 2024-08-17

### Added
- Initial release of slidev-addon-notecell
- Interactive Jupyter notebook cells for Slidev presentations
- Support for Python code execution with Thebe Core
- Vertical and horizontal layout options
- Initialization cells that run automatically
- Presenter mode warnings
- Customizable styling and output formatting
- Rich output support (plots, tables, images, HTML)
- Toggle between code and output views
- Status indicators for code execution
- Responsive design and theme compatibility