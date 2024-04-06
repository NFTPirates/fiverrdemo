'use client';
import { addSubscriber } from '@/app/actions/addSubscriber';
import { Card, CardBody, Button, Input } from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import styles from './subscribeNewsletter.module.css';
const initialState = {
    message: '',
};

export interface FormValues {
    fullName: string;
    email: string;
}

export default function App() {
    return (
        <Card fullWidth isBlurred className="border-none" shadow="sm">
            <CardBody>
                <div className={styles.container}>
                    <div className={styles.container__textContent}>
                        <h2>
                            Read the best crypto stories of the day in less than
                            5 minutes.
                        </h2>
                        <p>Subscribe to get it daily in your inbox</p>
                    </div>
                    <Form></Form>
                </div>
            </CardBody>
        </Card>
    );
}
interface IFormContentProps {
    email: string;
    fullName: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setFullName: Dispatch<SetStateAction<string>>;
}

export function FormContent(props: IFormContentProps) {
    const { pending } = useFormStatus();

    return (
        <>
            <div className={styles.container__input}>
                <Input
                    type="string"
                    variant={'underlined'}
                    onValueChange={(val) => props.setFullName(val)}
                    value={props.fullName}
                    label="Fullname"
                    placeholder="Enter your full name"
                    isRequired
                    id="fullName"
                    name="fullName"
                />
                <Input
                    type="email"
                    variant={'underlined'}
                    label="Email"
                    onValueChange={(val) => props.setEmail(val)}
                    value={props.email}
                    placeholder="Enter your email"
                    isRequired
                    id="email"
                    name="email"
                />
            </div>
            <Button
                type="submit"
                variant="solid"
                color="danger"
                isDisabled={pending}
            >
                {pending ? 'Submitting...' : 'Submit'}
            </Button>
        </>
    );
}

export function Form() {
    const [state, formAction] = useFormState(addSubscriber, initialState);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!state.message) {
            return;
        }

        if (state.message === 'success') {
            alert('Registration successul!');
        } else {
            alert('Something went wrong :(');
        }

        setEmail('');
        setFullName('');
    }, [state]);

    return (
        <form className={styles.container__submitSection} action={formAction}>
            <FormContent
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
            />
        </form>
    );
}
