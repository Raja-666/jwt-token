import { api } from "../store/Baseurl"

const registerApi = api.injectEndpoints({
    endpoints: builder => ({
        getRegister: builder.query({
            query: () => ({ url: `/register` }
            ),
            providesTags: ['Crud']
        }),
        createRegister: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Crud']
        }),
        updateRegister: builder.mutation({
            query: (body) => ({
                url: "/register/editUser",
                method: 'POST',
                body
            }),
            invalidatesTags: ['Crud']
        }),
        editRegister: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/register/update/${id}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Crud']
        }),
        deleteRegister: builder.mutation({
            query: (body) => ({
                url: '/register/delete',
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Crud']
        })
    })
})

export const{useCreateRegisterMutation,useDeleteRegisterMutation,useGetRegisterQuery,useEditRegisterMutation,useUpdateRegisterMutation,}=registerApi