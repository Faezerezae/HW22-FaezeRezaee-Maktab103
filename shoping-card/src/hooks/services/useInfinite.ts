import { UseBaseQueryResult, UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../api/Products-api";

export const useInfinite=<T>(
    queryKey:string[],
    endPoint:string,
    options:UseInfiniteQueryOptions<T> | undefined=undefined):UseBaseQueryResult<T>=>{
        return useInfiniteQuery({
            queryKey: queryKey,
            queryFn: async ({ pageParam }) => await (await axiosInstance(endPoint, {
              params: {
                limit: 10,
                skip: pageParam
              }
            })).data,
            initialPageParam: 0,
            getNextPageParam: (lastPage, allpages, lastPageParam, allPageParams) => {
              if ((lastPage as {total:number}).total > (lastPageParam as number) ){
                return (lastPageParam as number)+ 10;
              }
              return undefined;
            },
            ...options
          })
    }



//----------------------------------------------------------------------------------------
      // const containerRef = useRef<HTMLDivElement | null>(null)
//   const {
//     data,
//     isLoading,
//     isSuccess,
//     error,
//     hasNextPage,
//     fetchNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ['Products'],
//     queryFn: async ({ pageParam }) => await (await axiosInstance('products', {
//       params: {
//         _limit: 10,
//         skip: pageParam
//       }
//     })).data,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, allpages, lastPageParam, allPageParams) => {
//       if (lastPage.total > lastPageParam) {
//         return lastPageParam + 10;
//       }
//       return undefined;
//     },
//   })
//   console.log(data);
//   console.log(hasNextPage);

//   const flatData = useMemo(() => {
//     return data?.pages.flatMap((page) => page.products)
//   }, [data])
//   console.log(flatData);

//   const [ref, inView, entry] = useInView();
//   useEffect(()=>{
// if (inView && hasNextPage ) {
//   fetchNextPage()
// }
//   },[inView])
//-----------------------------------------------------------------------------------
  // const containerRef = useRef<HTMLDivElement | null>(null)
//   const {
//     data,
//     isLoading,
//     isSuccess,
//     error,
//     hasNextPage,
//     fetchNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ['Products'],
//     queryFn: async ({ pageParam }) => await (await axiosInstance('products', {
//       params: {
//         _limit: 10,
//         _page: pageParam
//       }
//     })).data,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, allpages, lastPageParam, allPageParams) => {
//       if (lastPage.total > lastPageParam) {
//         return lastPageParam + 10;
//       }
//       return undefined;
//     },
//   })
//   console.log(data);
//   console.log(hasNextPage);

//   const flatData = useMemo(() => {
//     return data?.pages.flatMap((page) => page.products)
//   }, [data])
//   console.log(flatData);

//   const [ref, inView, entry] = useInView();
//   useEffect(()=>{
// if (inView && hasNextPage ) {
//   fetchNextPage()
// }
//   },[inView])

  // const fetchMorePage = useCallback((el: HTMLDivElement | null) => {
  //   if (el) {
  //     const { scrollHeight, scrollTop, clientHeight } = el;
  //     // console.log(clientHeight);
  //     if (scrollHeight - scrollTop === clientHeight && !isFetching) {
  //       hasNextPage && fetchNextPage()
  //     }
  //   }
  // }, [isFetching, hasNextPage])
  // onScroll={() => fetchMorePage(containerRef.current)}

  // console.log(data?.pages[0].products);