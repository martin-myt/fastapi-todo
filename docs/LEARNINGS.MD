# Development and Troubleshooting Learnings

This document captures key learnings and best practices from our development and troubleshooting experiences.

## Project Structure and Organization

### Common Issues
- Multiple directories with similar names can lead to confusion (e.g., multiple `frontend/` directories)
- Relative paths in Docker configurations may be unclear without proper context
- Command execution from different directories can produce inconsistent results

### Best Practices
- Maintain a clear and documented project structure
- Use absolute paths or well-defined relative paths in Docker configurations
- Document the correct working directory for different operations
- Consider using a project-specific `.env` file to define key paths and configurations

## Dependency Management

### Common Issues
- Version mismatches between related packages (e.g., Vite and esbuild)
- Assumptions about version compatibility without verification
- Incomplete understanding of how dependencies interact in containerized environments

### Best Practices
- Document explicit version requirements and compatibility matrices
- Check official documentation for known compatibility issues
- Verify dependency versions inside containers match expectations
- Use exact versions (`--save-exact`) when version sensitivity is critical

## Docker Configuration

### Common Issues
- Volume mounts may interfere with container-specific configurations
- Development vs. production environment differences
- Unclear distinction between build-time and runtime configurations

### Best Practices
- Document the purpose of each volume mount
- Clearly separate development and production configurations
- Verify file ownership and permissions in mounted volumes
- Consider using named volumes for persistent data
- Document which files should be mounted for development (hot-reloading)

## Troubleshooting Methodology

### Common Pitfalls
- Making multiple changes simultaneously
- Not validating intermediate states
- Lacking clear hypotheses for changes
- Not documenting attempted solutions

### Best Practices
1. **Initial Assessment**
   - Document the current state
   - Define expected behavior
   - Gather relevant logs and error messages
   - Check if the issue is environment-specific

2. **Systematic Approach**
   - Make one change at a time
   - Document each change and its rationale
   - Verify the impact of each change
   - Keep track of attempted solutions and outcomes

3. **Validation**
   - Test in multiple environments when possible
   - Verify intermediate states
   - Document successful and unsuccessful attempts
   - Consider edge cases and potential side effects

## Effective Troubleshooting Prompts

When encountering issues, consider these types of questions:

### Project Structure
```
- What is the complete directory structure?
- Where are configuration files located?
- Which directory contains the active code?
```

### Environment and Configuration
```
- What environment variables are being used?
- Are there differences between development and production?
- Can we reproduce this locally?
```

### Dependencies
```
- What are the exact version requirements?
- Are there known compatibility issues?
- How do dependencies interact in our environment?
```

### Docker and Containers
```
- What is the purpose of each volume mount?
- What files are present in the container?
- How do host and container environments differ?
```

### Problem Solving
```
- What specific problem are we trying to solve?
- What have we already tried?
- Can we verify the current state?
```

## Documentation Best Practices

1. **Keep a Change Log**
   - Document all significant changes
   - Include rationale for changes
   - Note any known issues or limitations

2. **Environment Documentation**
   - Document required environment variables
   - List all dependencies and their versions
   - Include setup instructions for different environments

3. **Troubleshooting Guide**
   - Document common issues and solutions
   - Include debugging procedures
   - List useful commands and their purposes

## Continuous Improvement

- Regularly review and update documentation
- Share learnings with team members
- Update best practices based on new experiences
- Consider automating common troubleshooting tasks
- Maintain a knowledge base of solved issues 