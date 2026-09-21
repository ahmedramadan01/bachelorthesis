import multiprocessing
import time


def is_prime(n):
    if n <= 1:
        return False
    elif n <= 3:
        return True
    elif n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


def calculate_primes(start, end):
    primes = []
    for num in range(start, end):
        if is_prime(num):
            primes.append(num)
    return primes


def main():
    start_time = time.time()
    start_range = 2
    end_range = 15485863

    num_cpus = multiprocessing.cpu_count()
    pool = multiprocessing.Pool(processes=num_cpus)
    chunk_size = (end_range - start_range) // num_cpus
    results = pool.starmap(calculate_primes, [(start_range + i*chunk_size,
                                              start_range +
                                              (i+1)*chunk_size) for i in
                                              range(num_cpus)])
    pool.close()
    pool.join()
    all_primes = []
    for primes_list in results:
        all_primes.extend(primes_list)
    end_time = time.time()
    print(f"Total prime numbers found: {len(all_primes)}")
    print(f"Time taken: {end_time - start_time:.2f} seconds")


if __name__ == "__main__":
    main()
