export class EventUtil {
  static preventDefault(event) {
    event.preventDefault();
  }

  static stopPropagation(event) {
    event.stopPropagation();
  }

  

  static stop(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
