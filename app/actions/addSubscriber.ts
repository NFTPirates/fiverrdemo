'use server';

import { createClient } from '../utils/supabase/server';

export async function addSubscriber(
    prevState: {
        message: string;
    },
    formData: FormData
) {
    // Return early if the form data is invalid

    const supaBase = createClient();

    const { data, error } = await supaBase
        .from('users')
        .insert({
            fullname: formData.get('fullName'),
            email: formData.get('email'),
        })
        .select()
        .single();

    if (error) {
        return { message: error.message };
    }
    return { message: 'success' };
}
