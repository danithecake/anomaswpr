export class DeferredPromise<V, E = unknown> {
  resolve: (result: V) => void = () => {}
  reject: (error: E) => void = () => {}
  pending: boolean = false
  promise: Promise<V>

  constructor() {
    this.promise = new Promise<V>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
      this.pending = true
    }).finally(() => {
      this.pending = false
    })
  }
}
