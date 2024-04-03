'use server';

import { createClient } from '../utils/supabase/server';

export async function addSubscriber(
    prevState: {
        message: string;
    },
    formData: FormData
) {
    // Return early if the form data is invalid
    console.log(formData);
    console.log(formData.entries().next());

    const supaBase = createClient();

    console.log(supaBase, 'supa');

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
