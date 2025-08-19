# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2024-08-18

### Changed
- Updated thebe-core dependency from locked version 0.4.10 to ^0.4.10 to allow for latest compatible updates
- Updated Slidev peer dependency requirement from >=0.32.1 to >=0.40.0 to match current Slidev versions

## [1.0.8] - 2024-08-18

### Fixed
- Simplified indentation fix to only remove leading whitespace from the beginning of the code content
- Addresses the specific Slidev processing issue that adds indentation to the first line

## [1.0.7] - 2024-08-18

### Fixed
- Improved indentation fix with more robust approach to handle code whitespace
- Implemented comprehensive line-by-line processing to remove common leading whitespace
- Added better handling of empty lines at beginning and end of code blocks

## [1.0.6] - 2024-08-18

### Fixed
- Fixed indentation error when sending code to Jupyter by properly trimming code content
- Removed leading/trailing whitespace and fixed indentation issues in code cells

## [1.0.5] - 2024-08-18

### Fixed
- Fixed "can't access property 'notebook', (intermediate value).jupyter[nbid] is undefined" error by adding proper initialization checks
- Enhanced error handling for Jupyter connection and execution processes
- Added visual feedback for connection status (error states)
- Improved notebook initialization process with better error recovery
- Added more robust checks before accessing Jupyter objects

## [1.0.4] - 2024-08-18

### Fixed
- Added deferred initialization to prevent conflicts with Slidev's navigation system
- Enhanced navigation property access with additional fallbacks and validation
- Improved error handling for all Slidev global variable access

## [1.0.3] - 2024-08-18

### Fixed
- Fixed "The requested module doesn't provide an export named: 'ServerConnection'" error by updating import path
- Resolved module resolution issues with @jupyterlab/services dependency

## [1.0.2] - 2024-08-18

### Fixed
- Further improved "can't access property 'params', currentRoute is undefined" error by implementing more robust navigation property access
- Added additional fallbacks for page number detection using URL parsing
- Enhanced error handling for all Slidev global variable access
- Improved component initialization to prevent errors when DOM elements are not yet available
- Added safety checks for notebook and cell creation

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