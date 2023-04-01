/*! Ring_Buffer_Tutorial.cpp ver1.0 | MIT License | https://github.com/dak-ia/Ring_Buffer_Tutorial/blob/main/LICENSE*/
#define N 3//Specify the size of the ring buffer
#include<stdio.h>
int c = 0;
struct queue {
    char data[N];
    int head;
    int tail;
};
void reset(struct queue* q) {//Initialize
    q->head = 1;
    q->tail = 1;
    for (int i = 1; i <= N; i++) {
        q->data[i] = NULL;
    }
}//main
void mainqueue(struct queue* q, char key) {
    if (q->tail > N or c != 0) {
        char tmp = q->data[q->head];
        printf("OUTPUT:%c\n\n\n", tmp);
        q->tail = q->head;
        if (q->head >= N) {
            q->head = 1;
        }
        else {
            q->head++;
        }
        q->data[q->tail] = key;
        c++;
    }
    else {
        q->data[q->tail] = key;
        q->tail++;
    }
}
//end
void endqueue(struct queue* q, char key) {
    char tmp;
    for (int i = 1; i <= N; i++) {
        if (q->head >= N) {
            tmp = q->data[q->head];
            printf("OUTPUT:%c\n", tmp);
            q->head = 1;
        }
        else {
            tmp = q->data[q->head];
            printf("OUTPUT:%c\n", tmp);
            q->head++;
        }
    }
    q->data[q->head] = key;
    tmp = q->data[q->head];
    printf("OUTPUT:%c\n", tmp);
}
int main() {
    char key;//input value
    struct queue Q;
    reset(&Q);
    do {
        printf("INPUT:");
        scanf_s(" %c", &key);
        printf("\n");
        if (key == 'Z') {//Press "Z" to end
            endqueue(&Q, key);
            break;
        }
        else {
            mainqueue(&Q, key);
        }
    } while (key != EOF);
}
