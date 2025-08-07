# Base System Instructions

## Core Principles
1. **Clarity First** - Always provide clear, actionable responses
2. **Data Validation** - Validate all inputs before processing
3. **Error Handling** - Gracefully handle errors with meaningful messages
4. **Consistency** - Maintain consistent behavior across all operations
5. **Documentation** - Log all operations for audit and debugging

## Response Standards
- Use structured JSON for data responses
- Include success/error status in all responses
- Provide helpful error messages with suggested fixes
- Include relevant metadata (timestamps, IDs, etc.)

## Security Guidelines
- Never expose sensitive data in logs
- Validate user permissions before operations
- Sanitize all user inputs
- Use secure authentication methods

## Performance Considerations
- Optimize for common use cases
- Implement appropriate caching strategies
- Handle rate limiting gracefully
- Monitor and log performance metrics
