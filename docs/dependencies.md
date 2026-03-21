# Dependencies - IT Tools Dashboard

## Overview

The IT Tools Dashboard is a lightweight application with minimal dependencies. All dependencies are loaded via CDN and run client-side in the browser.

## Runtime Dependencies

### JavaScript Libraries

#### 1. js-yaml
- **Version**: 4.1.0
- **CDN**: https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js
- **Purpose**: YAML parsing and stringifying
- **License**: MIT
- **Size**: ~15KB (minified)
- **Used By**: JSON ↔ YAML converter

#### 2. xml2js
- **Version**: 0.4.23
- **CDN**: https://cdnjs.cloudflare.com/ajax/libs/xml2js/0.4.23/xml2js.min.js
- **Purpose**: XML to JSON conversion
- **License**: MIT
- **Size**: ~45KB (minified)
- **Used By**: XML ↔ JSON converter

#### 3. @iarna/toml
- **Version**: 2.2.5
- **CDN**: https://cdn.jsdelivr.net/npm/@iarna/toml@2.2.5/dist/toml.min.js
- **Purpose**: TOML parsing and stringifying
- **License**: ISC
- **Size**: ~20KB (minified)
- **Used By**: TOML ↔ JSON converter

#### 4. Babel Standalone
- **Version**: 7.23.5
- **CDN**: https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js
- **Purpose**: TypeScript and JSX transpilation
- **License**: MIT
- **Size**: ~2.5MB (minified)
- **Used By**: TS/JSX → JS transpiler
- **Note**: Large file size due to including all presets

## Development Dependencies

### None

This project does not use any build tools, package managers, or development dependencies. All code is written in vanilla HTML, CSS, and JavaScript.

## Browser Requirements

### Minimum Browser Versions

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 11+
- **Edge**: 79+
- **Opera**: 47+

### Required Browser Features

- ES6+ JavaScript support
- CSS Grid and Flexbox
- Fetch API (not currently used, but available)
- Local Storage (for future enhancements)
- Clipboard API (for future enhancements)

### Optional Features

- Web Crypto API (for enhanced crypto key conversions)
- Service Workers (for offline support)
- IndexedDB (for data persistence)

## CDN Dependencies

### CDN Providers

#### Cloudflare CDN (cdnjs)
- **URL**: https://cdnjs.cloudflare.com
- **Libraries**: js-yaml, xml2js, Babel standalone
- **Reasoning**: High reliability, global coverage, version pinning

#### jsDelivr
- **URL**: https://cdn.jsdelivr.net
- **Libraries**: @iarna/toml
- **Reasoning**: Fast, supports npm packages directly

### CDN Fallback Strategy

Currently, there is no fallback mechanism implemented. If CDN libraries fail to load:
1. Affected converters will not work
2. User will see error messages
3. Other converters will continue to work

**Future Enhancement**: Implement CDN fallback with multiple sources

## Dependency Security

### Security Considerations

1. **Version Pinning**: All dependencies use specific versions (not "latest")
2. **HTTPS Only**: All CDN URLs use HTTPS
3. **No Arbitrary Code**: Libraries are used for specific, well-defined purposes
4. **Input Validation**: All user inputs are validated before processing
5. **No Secrets**: No API keys or credentials in dependencies

### Known Vulnerabilities

As of the implementation date:
- js-yaml 4.1.0: No known critical vulnerabilities
- xml2js 0.4.23: No known critical vulnerabilities
- @iarna/toml 2.2.5: No known critical vulnerabilities
- Babel 7.23.5: No known critical vulnerabilities

**Note**: Regular security audits should be performed to check for new vulnerabilities.

## Dependency Updates

### Update Policy

1. **Check Monthly**: Review dependency updates monthly
2. **Test Thoroughly**: Test all affected converters after updates
3. **Document Changes**: Update this document with new versions
4. **Breaking Changes**: Provide migration guide if needed

### Update Process

1. Check new version on CDN
2. Review changelog for breaking changes
3. Update version in HTML file
4. Test all affected converters
5. Update documentation

### Rollback Strategy

If an update causes issues:
1. Revert to previous version immediately
2. Document the issue
3. Report bug to library maintainers
4. Wait for fix before updating again

## Dependency Alternatives

### js-yaml Alternatives
- **yaml**: More modern, but larger
- **js-yaml-fork**: Community fork with more features
- **Current Choice**: js-yaml (stable, well-maintained)

### xml2js Alternatives
- **fast-xml-parser**: Faster, but different API
- **xml-js**: Simpler API, but less features
- **Current Choice**: xml2js (mature, widely used)

### @iarna/toml Alternatives
- **toml-j0.4**: Supports TOML 0.4.0
- **toml**: Official TOML parser for Node.js
- **Current Choice**: @iarna/toml (browser-compatible)

### Babel Alternatives
- **SWC**: Faster, but larger
- **Sucrase**: Faster, but less features
- **TypeScript Compiler**: Native, but requires build step
- **Current Choice**: Babel standalone (browser-compatible, full-featured)

## Dependency Size Optimization

### Current Total Size
- js-yaml: ~15KB
- xml2js: ~45KB
- @iarna/toml: ~20KB
- Babel standalone: ~2.5MB
- **Total**: ~2.58MB

### Optimization Opportunities

1. **Lazy Loading**: Load Babel only when TS/JSX converter is used
2. **Tree Shaking**: Use modular Babel builds (requires build step)
3. **Alternative Libraries**: Consider lighter alternatives for specific use cases
4. **Code Splitting**: Split converter logic into separate modules

### Trade-offs

- **Performance vs. Features**: Babel is large but provides full transpilation
- **Convenience vs. Size**: CDN libraries are convenient but add to initial load
- **Functionality vs. Complexity**: Simpler libraries may lack features

## Dependency Licensing

### License Summary

All dependencies use permissive open-source licenses:

- **MIT License**: js-yaml, xml2js, Babel standalone
- **ISC License**: @iarna/toml

### License Compliance

- ✅ All licenses are compatible with commercial use
- ✅ No attribution required (though appreciated)
- ✅ Can modify and distribute
- ✅ Must include license text

### License Texts

License texts should be included in the project's LICENSE file or in a NOTICES file.

## Dependency Monitoring

### Monitoring Tools

Recommended tools for monitoring dependency updates and vulnerabilities:

1. **Dependabot**: Automated dependency updates (GitHub)
2. **Snyk**: Vulnerability scanning
3. **npm audit**: For Node.js dependencies (if added)
4. **Retire.js**: Detect outdated JavaScript libraries

### Monitoring Schedule

- **Vulnerability Scanning**: Weekly
- **Version Updates**: Monthly
- **License Compliance**: Quarterly

## Dependency Removal

### Removal Criteria

Consider removing a dependency if:
1. It's no longer used by any feature
2. A lighter alternative is available
3. Security vulnerabilities cannot be fixed
4. The library is unmaintained

### Removal Process

1. Identify all usages of the dependency
2. Replace with alternative or remove feature
3. Test thoroughly
4. Update documentation
5. Remove from HTML file

## Future Dependencies

### Potential Additions

1. **Prettier**: Code formatting tools
2. **ESLint**: Code linting playground
3. **JSON Schema Validator**: Schema validation
4. **QR Code Generator**: QR code generation
5. **Diff Libraries**: Text and JSON diffing

### Addition Guidelines

Before adding a new dependency:

1. **Evaluate Necessity**: Is there a vanilla JS solution?
2. **Check Size**: Is the library too large?
3. **Review License**: Is the license compatible?
4. **Assess Maintenance**: Is the library actively maintained?
5. **Test Compatibility**: Does it work in all target browsers?

### Addition Process

1. Research available options
2. Choose best library based on criteria
3. Test in development environment
4. Document usage and API
5. Add to this document

## Dependency Troubleshooting

### Common Issues

#### CDN Loading Failure
**Symptoms**: Converters not working, console errors
**Solution**: Check internet connection, CDN status

#### Version Compatibility
**Symptoms**: Unexpected behavior, errors
**Solution**: Check version compatibility, update if needed

#### Browser Compatibility
**Symptoms**: Not working in specific browser
**Solution**: Check browser requirements, use polyfills if needed

#### Memory Issues
**Symptoms**: Slow performance, browser crashes
**Solution**: Reduce input size, implement streaming

### Debugging Steps

1. Check browser console for errors
2. Verify CDN libraries are loaded
3. Test with minimal input
4. Check browser compatibility
5. Review dependency documentation

## Dependency Documentation

### External Documentation

- [js-yaml Documentation](https://github.com/nodeca/js-yaml)
- [xml2js Documentation](https://github.com/Leonidas-from-XIV/node-xml2js)
- [@iarna/toml Documentation](https://github.com/iarna/toml)
- [Babel Documentation](https://babeljs.io/docs/)

### Internal Documentation

- `docs/api-externals.md`: External API contracts
- `docs/data-models.md`: Data structures and formats
- `tools/converters/converters-main.js`: Implementation details

## Dependency Maintenance

### Maintenance Tasks

- [ ] Monthly dependency update review
- [ ] Quarterly security audit
- [ ] Annual license compliance review
- [ ] Update documentation on changes
- [ ] Monitor CDN availability
- [ ] Track dependency deprecations

### Maintenance Schedule

| Task | Frequency | Owner |
|------|-----------|-------|
| Version Updates | Monthly | Developer |
| Security Scans | Weekly | Developer |
| License Review | Quarterly | Developer |
| Documentation Updates | As needed | Developer |

## Summary

The IT Tools Dashboard uses 4 external JavaScript libraries loaded via CDN:
- js-yaml (15KB) - YAML parsing
- xml2js (45KB) - XML parsing
- @iarna/toml (20KB) - TOML parsing
- Babel standalone (2.5MB) - TypeScript/JSX transpilation

**Total Size**: ~2.58MB

All dependencies use permissive licenses (MIT/ISC) and are well-maintained. The application is designed to work entirely client-side with no server-side dependencies.
