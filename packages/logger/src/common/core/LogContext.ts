export class LogContext extends Map<string, any> {
  toJSON() {
    return [...this.entries()].reduce((context, [key, value]) => {
      return {
        ...context,
        [key]: value
      };
    }, {});
  }
}
